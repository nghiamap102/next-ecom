import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import BoxIntro from '@components/BoxIntro';
import { mainColor } from '@theme/theme';
import FormLoginWrapper from '@view/Login';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { wrapper } from 'redux/store';
import Example from '@components/test';

const Login: NextPage = () => {
    const router = useRouter()
    return (
        <Container maxW='100%' p={0} h='100vh'>
            <Grid templateColumns='repeat(2,1fr)' h='100%'>
                <GridItem colSpan={1} bgImage='_next/static/media/bg-login.89958185.jpeg' position={'relative'}>
                    <BoxIntro content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
                        since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"/>
                </GridItem>
                <GridItem colSpan={1} p='5rem 2rem' display='flex' bg={mainColor.skin} >
                    <Box className='text-center' p={14} w='100%' maxW='40rem' margin='0 auto' borderRadius={30} bg={mainColor.white}>
                        <FormLoginWrapper router={router} />
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const translate = await serverSideTranslations(locale as string, [
        'common', 'product'
    ])

    return {
        props: {
            ...translate,
        }
    }
})

export default Login
