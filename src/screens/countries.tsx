import React from 'react';
import {sort} from 'fast-sort';
import {
  FlatList,
  GestureResponderEvent,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useSummaryAPI, {CountriesEntity} from '../api/summary';
import CountryCard from '../components/CountryCard';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';

type SortKeys = 'TotalConfirmed' | 'TotalDeaths' | 'TotalRecovered' | 'none';
type SortOrders = 'desc' | 'asc' | 'none';
type SortTypes = {
  key: SortKeys;
  order: SortOrders;
};

const renderItem = ({item}: {item: CountriesEntity}) => (
  <CountryCard {...item} />
);

const CountriesScreen: React.RNFC = () => {
  const [activeSort, setActiveSort] = React.useState<SortTypes>({
    key: 'none',
    order: 'none',
  });
  const {data, isLoading, isRefetching, refetch} = useSummaryAPI();
  const [filteredCountries, setFilteredCountries] = React.useState(
    data?.Countries,
  );
  const [sortedCountries, setSortedCountries] = React.useState<
    CountriesEntity[]
  >([]);
  const [isSorting, setIsSorting] = React.useState(false);

  React.useEffect(() => {
    setIsSorting(activeSort.key !== 'none');
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      const sortable = sort(filteredCountries ?? []);
      const sortKey = (x: CountriesEntity) =>
        activeSort.key === 'none' ? [] : x[activeSort.key];
      const sortedFilteredCountries =
        activeSort.order === 'desc'
          ? sortable.desc(sortKey)
          : activeSort.order === 'asc'
          ? sortable.asc(sortKey)
          : [];
      setSortedCountries(sortedFilteredCountries);
    });
    interactionPromise.done(() => {
      setIsSorting(false);
    });
    return () => interactionPromise.cancel();
  }, [activeSort, filteredCountries]);

  const onSearch = React.useCallback(
    (searchKeyword: string) => {
      setActiveSort({key: 'none', order: 'none'});
      setFilteredCountries(
        data?.Countries?.filter(country =>
          country.Country.toLowerCase().includes(searchKeyword.toLowerCase()),
        ),
      );
    },
    [data],
  );

  const onSort = React.useCallback((sortKey: SortKeys) => {
    const getNextSortOrder = (order: SortOrders) =>
      order === 'asc' ? 'desc' : order === 'desc' ? 'none' : 'asc';
    setActiveSort(prevSort => {
      const newOrder = getNextSortOrder(prevSort.order);
      return {
        key: newOrder === 'none' ? 'none' : sortKey,
        order: newOrder,
      };
    });
  }, []);

  const ListHeaderComponent = (
    <View style={styles.headerView}>
      <SearchInput onSearch={onSearch} editable={!isSorting} />
      <View style={styles.sortView}>
        <Text style={styles.caption}>Sort by:</Text>
        <SortPressable
          sortKey="TotalConfirmed"
          activeSort={activeSort}
          onPress={() => onSort('TotalConfirmed')}
          name="Active"
        />
        <SortPressable
          sortKey="TotalRecovered"
          activeSort={activeSort}
          onPress={() => onSort('TotalRecovered')}
          name="Recovered"
        />
        <SortPressable
          sortKey="TotalDeaths"
          activeSort={activeSort}
          onPress={() => onSort('TotalDeaths')}
          name="Deaths"
        />
      </View>
    </View>
  );

  if (isLoading) return <Loader />;

  return (
    <View style={styles.parentView}>
      <FlatList
        data={sortedCountries.length ? sortedCountries : filteredCountries}
        renderItem={renderItem}
        keyExtractor={item => item.ID}
        initialNumToRender={5}
        ListHeaderComponent={ListHeaderComponent}
        stickyHeaderIndices={[0]}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </View>
  );
};

function SortPressable({
  sortKey,
  activeSort,
  onPress,
  name,
}: {
  sortKey: SortKeys;
  activeSort: SortTypes;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  name: string;
}) {
  const isSort = activeSort.key === sortKey;
  const SortIndicator = isSort
    ? activeSort.order === 'desc'
      ? '↓'
      : activeSort.order === 'asc'
      ? '↑'
      : ''
    : '';
  return (
    <TouchableOpacity
      style={[styles.sortPressable, isSort ? styles.activePressable : {}]}
      onPress={onPress}>
      <Text style={[styles.sortText, isSort ? styles.activeSortText : {}]}>
        {SortIndicator} {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
  },
  searchText: {
    color: '#000',
  },
  headerView: {
    flex: 1,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 12,
  },
  caption: {
    fontSize: 12,
    color: '#b9b7b9ed',
    marginRight: 6,
  },
  sortView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  sortText: {
    fontSize: 14,
    color: '#000',
  },
  sortPressable: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#000',
  },
  activePressable: {
    backgroundColor: '#000',
  },
  activeSortText: {
    color: '#fff',
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {CountriesScreen as default};
