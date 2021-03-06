import ConstructorLink from 'components/ConstructorLink'
import Layout from 'components/Layout'
import { google } from 'googleapis'
import { googleAuth } from 'helpers/auth'
import { normalizeConstructorName } from 'helpers/cars'
import { sortArray } from 'helpers/utils'

const sheets = google.sheets('v4')

const HomePage = ({ constructors }) => {
  return (
    <Layout documentTitle="Constructors">
      <div className="grid grid-cols-1 gap-y-8 gap-x-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {constructors.map((constructor) => {
          const normalized = normalizeConstructorName(constructor)
          return (
            <ConstructorLink normalizedConstructor={normalized} key={constructor}>
              <a className="relative flex flex-col items-center justify-center sm:div-children:hover:shadow-inset-black-7">
                <div
                  className="bg-contain rounded-lg h-72 w-72 shadow-inset-black-6"
                  style={{
                    backgroundImage: `url('/cars/${normalized}.webp')`,
                  }}
                />
                <h2 className="absolute px-4 text-4xl font-bold text-center text-gray-100 uppercase font-primary">
                  {constructor}
                </h2>
              </a>
            </ConstructorLink>
          )
        })}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  google.options({ auth: googleAuth })

  const existingColumnData = await sheets.spreadsheets.get({
    ranges: ["'STANDINGS'!A2:A9"],
    spreadsheetId: process.env.SPREADSHEET_ID,
    includeGridData: true,
  })

  const constructors = existingColumnData.data.sheets[0].data[0].rowData
    ?.map((row) => row.values.map((rowValue) => rowValue.formattedValue))
    .flat()

  return {
    props: {
      constructors: sortArray(constructors),
    },
  }
}

export default HomePage
