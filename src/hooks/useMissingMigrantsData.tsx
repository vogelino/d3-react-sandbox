import { useState, useEffect } from 'react'
import { csv } from 'd3'
import { feature, mesh } from 'topojson'

const jsonUrl = `https://gist.githubusercontent.com/vogelino/42da8726b0534f4386b831aa66a50a26/raw/72ea2b27963fe3b3052c8d2eea72e2e54db7fec9/Missing_Migrants_Global_Figures.csv`

interface MissingMigrantsRawRow {
  'Main ID': string
  'Incident ID': string
  'Incident Type': string
  'Region of Incident': string
  'Incident Date': string
  'Incident year': string
  'Reported Month': string
  'Number of Dead': string
  'Minimum Estimated Number of Missing': string
  'Total Number of Dead and Missing': string
  'Number of Survivors': string
  'Number of Females': string
  'Number of Males': string
  'Number of Children': string
  'Region of Origin': string
  'Cause of Death': string
  'Migration route': string
  'Location of death': string
  'Information Source': string
  Coordinates: string
  'UNSD Geographical Grouping': string
  'Article title': string
  'Source Quality': string
  URL: string
}

interface MissingMigrantsParsedObject {
  id: string
  date: Date
  deadOrMissingTotal: number
  url: string
  latitude: number
  longitude: number
}

export type UseDataOutput = {
  land: ReturnType<typeof feature>
  interiors: ReturnType<typeof mesh>
}

export const useMissingMigrantsData = ():
  | MissingMigrantsParsedObject[]
  | null => {
  const [data, setData] = useState<MissingMigrantsParsedObject[] | null>(null)

  useEffect(() => {
    csv(jsonUrl, (row: MissingMigrantsRawRow) => {
      const [latitude, longitude] = row.Coordinates.replace('POINT (', '')
        .replace(')', '')
        .split(' ')
        .map((n) => +n)
      return {
        id: row['Incident ID'],
        date: new Date(row['Incident Date']),
        deadOrMissingTotal: +row['Total Number of Dead and Missing'] || 0,
        url: row.URL,
        latitude,
        longitude,
      }
    }).then((allRows: MissingMigrantsParsedObject[]) => {
      setData(allRows)
    })
  }, [])

  return data
}
