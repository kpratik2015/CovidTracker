import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CountriesEntity} from '../../api/summary';

type CountryCardProps = CountriesEntity;

export const CARD_HEIGHT = 155;

const CountryCard: React.FC<CountryCardProps> = ({
  Country,
  TotalConfirmed,
  TotalDeaths,
  TotalRecovered,
  NewConfirmed,
  NewRecovered,
  NewDeaths,
  CountryCode,
  Date: dateProp,
}) => {
  const parsedDate = new Date(dateProp);
  const timestamp = `${parsedDate.toLocaleString()}`;
  return (
    <View style={styles.parentView}>
      <View style={styles.rowCenterView}>
        <View style={styles.flagContainer}>
          <Text style={styles.flagText}>{getFlagEmoji(CountryCode)}</Text>
          <Text style={styles.countryName}>{Country}</Text>
        </View>
      </View>
      <View style={styles.contentView}>
        <View style={styles.rowCenterView}>
          <Stat
            title="Total Cases"
            totalCount={TotalConfirmed}
            newCount={NewConfirmed}
            statColor="#5a93ff"
          />
          <Stat
            title="Deaths"
            totalCount={TotalDeaths}
            newCount={NewDeaths}
            statColor="#ff5a5a"
          />
          <Stat
            title="Recovered"
            totalCount={TotalRecovered}
            newCount={NewRecovered}
            statColor="#42be00"
          />
        </View>
        <View style={styles.timestampView}>
          <Text style={styles.caption}>Last updated: </Text>
          <Text style={styles.timestampText}>{timestamp}</Text>
        </View>
      </View>
    </View>
  );
};

function Stat({
  title,
  totalCount,
  newCount,
  statColor = '#b9b7b9ed',
}: {
  title: string;
  totalCount: number;
  newCount: number;
  statColor?: string;
}) {
  return (
    <View style={styles.statView}>
      <Text style={styles.statTitleText}>{title}</Text>
      <Text style={[styles.statTotalCountText, {color: statColor}]}>
        {totalCount}
      </Text>
      <View style={[styles.rowCenterView, newCount ? {} : styles.hidden]}>
        <Text style={styles.caption}>New: </Text>
        <Text style={[styles.statNewCountText, {color: statColor}]}>
          +{newCount}
        </Text>
      </View>
    </View>
  );
}

function getFlagEmoji(countryCode: string) {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const styles = StyleSheet.create({
  parentView: {
    height: CARD_HEIGHT,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 12,
    padding: 12,
  },
  countryName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  totalCases: {
    fontSize: 12,
  },
  flagContainer: {
    marginRight: 12,
    flexDirection: 'row',
  },
  flagText: {
    fontSize: 18,
    marginRight: 6,
  },
  rowCenterView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caption: {
    fontSize: 12,
    color: '#b9b7b9ed',
  },
  timestampView: {
    flexDirection: 'row',
  },
  timestampText: {
    fontSize: 12,
    color: '#b9b7b9ed',
    fontWeight: 'bold',
  },
  contentView: {
    flex: 1,
  },
  statTitleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#b9b7b9ed',
  },
  statTotalCountText: {
    fontSize: 16,
  },
  statNewCountText: {
    fontSize: 12,
  },
  statView: {
    flex: 0.33,
    paddingVertical: 12,
  },
  hidden: {
    opacity: 0,
  },
});

export default React.memo(CountryCard, () => true);
