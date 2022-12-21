import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from 'redux/store';
import HomePage from 'view/Home';

const Home: NextPage = (props) => {
    return <HomePage products={props?.data?.product} />
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const res = await fetch(`${process.env.API_URL}/api/home`)
    const data = await res.json()
    const translate = await serverSideTranslations(locale as string, [
        'common', 'product', 'cart'
    ])
    return {
        props: {
            ...translate,
            data
        }
    }
})

export default Home
