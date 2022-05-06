import CarImage from 'components/CarImage'
import Layout from 'components/Layout'
import Link from 'next/link'
import { google } from 'googleapis'
import { googleAuth } from 'helpers/auth'

const sheets = google.sheets('v4')

const HomePage = ({ constructors }) => {
  return (
    <Layout documentTitle="Home" >
      <div className="grid grid-cols-1 gap-y-8 gap-x-4 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {constructors.map((constructor) => (
          <Link
            key={constructor}
            href={{
              pathname: '/constructors/[name]',
              query: { name: encodeURIComponent(constructor) },
            }}
          >
            <a className="relative flex flex-col items-center justify-center">
              <div
              // change bg-x to constructor once you have the car images
                className="bg-contain rounded-lg bg-winning-formula h-72 w-72"
                style={{
                  boxShadow: 'inset 0 0 0 100vw rgba(0,0,0,0.6)',
                }}
              />
              <h2 className="absolute px-4 text-3xl font-bold text-center uppercase dark:text-gray-100">
                {constructor}
              </h2>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  google.options({ auth: googleAuth })

  const existingColumnData = await sheets.spreadsheets.get({
    ranges: ["'STANDINGS'!A2:A9"],
    spreadsheetId: process.env.SPREADSHEET_ID,
    includeGridData: true,
  })

  return {
    props: {
      constructors: existingColumnData.data.sheets[0].data[0].rowData
        ?.map((row) => row.values.map((rowValue) => rowValue.formattedValue))
        .flat(),
    },
  }
}

export default HomePage
