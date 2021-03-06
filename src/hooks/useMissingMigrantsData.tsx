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

interface MissingMigrantIncident {
  id: string
  date: Date
  value: number
  url?: string
  latitude: number
  longitude: number
}

export type UseDataOutput = {
  land: ReturnType<typeof feature>
  interiors: ReturnType<typeof mesh>
}

export const useMissingMigrantsData = (): MissingMigrantIncident[] | null => {
  const [data, setData] = useState<MissingMigrantIncident[] | null>(null)

  useEffect(() => {
    csv(jsonUrl, (row: Partial<MissingMigrantsRawRow>, idx) => {
      const [latitude, longitude] = row.Coordinates ? row.Coordinates.replace('POINT (', '')
        .replace(')', '')
        .split(' ')
        .map((n) => +n) : [0, 0]
      return {
        id: row['Incident ID'] || `row-${idx}`,
        date: new Date(row['Incident Date'] || '2020-01-01'),
        value: +(row['Total Number of Dead and Missing'] || 0),
        url: row.URL,
        latitude,
        longitude,
      }
    }).then((allRows: MissingMigrantIncident[]) => {
      setData(
        allRows.filter(
          (d) => !!d.date && !!d.latitude && !!d.longitude && !!d.id,
        ),
      )
    })
  }, [])

  return data
}
