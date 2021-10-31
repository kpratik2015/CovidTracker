import React, {useMemo} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import {sort} from 'fast-sort';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import useSummaryAPI from '../api/summary';
import CountryCard from '../components/CountryCard';
import Loader from '../components/Loader';

const HomeScreen: React.RNFC = ({navigation}) => {
  const {isLoading, data} = useSummaryAPI();

  const topCountries = useMemo(
    () =>
      sort(data?.Countries ?? [])
        .desc(x => x.TotalConfirmed)
        .slice(0, 5),
    [data],
  );

  if (isLoading) return <Loader />;

  const globalStats = [
    {
      id: 'TotalDeaths',
      total: data?.Global.TotalDeaths ?? 0,
      style: {backgroundColor: '#6c757d', flex: 0.3},
    },
    {
      id: 'TotalRecovered',
      total: data?.Global.TotalRecovered ?? 0,
      style: {backgroundColor: '#28a745', flex: 0.5},
    },
    {
      id: 'TotalConfirmed',
      total: data?.Global.TotalConfirmed ?? 0,
      style: {backgroundColor: '#007bff', flex: 1},
    },
  ];

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={[styles.countryTitleView, styles.paddedContainer]}>
        <Text style={styles.titleText}>Top Countries</Text>
        <Pressable onPress={() => navigation.navigate('CountriesList')}>
          <Text style={styles.linkText}>See more</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        {topCountries.map(topCountry => (
          <CountryCard {...topCountry} key={topCountry.ID} />
        ))}
      </View>
      <View style={[styles.statsContainer, styles.paddedContainer]}>
        <Text style={styles.titleText}>Global Stats</Text>
        <View style={styles.legendView}>
          <LegendBox name="Deceased" color="#6c757d" />
          <LegendBox name="Recovered" color="#42be00" />
          <LegendBox name="Confirmed" color="#5a93ff" />
        </View>
        <View style={styles.compoundBarView}>
          {globalStats.map(globalStat => (
            <View
              style={[globalStat.style, styles.barView]}
              key={globalStat.id}>
              <Text style={styles.statNumber}>{`${(
                globalStat.total / 1000
              ).toFixed(1)}K`}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

function LegendBox({name, color}: {name: string; color: string}) {
  return (
    <>
      <View style={[styles.legendBoxView, {backgroundColor: color}]} />
      <Text style={styles.legendText}>{name}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddedContainer: {
    padding: 12,
  },
  countryTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  linkText: {
    fontSize: 16,
    color: '#4169e1',
  },
  scrollContainer: {
    flex: 1,
  },
  statsContainer: {
    flex: 1,
    marginTop: 12,
  },
  statNumber: {
    fontSize: 12,
    color: '#fff',
  },
  compoundBarView: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 6,
  },
  barView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendView: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
  },
  legendText: {
    fontSize: 14,
    color: '#000',
  },
  legendBoxView: {
    height: 10,
    width: 10,
    marginHorizontal: 6,
  },
});

export {HomeScreen as default};
