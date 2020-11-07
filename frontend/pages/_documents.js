import Document, { Html, Head, Main, NextScript } from 'next/document'
// import "../static/css/styles.css";

class MyDocument extends Document {
render() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {/* <link
                 rel="stylesheet"
                 href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css" 
                /> */}
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
                integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" 
                crossorigin="anonymous"/>
                {/* <link rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                /> */}
                <link rel="stylesheet"
                href="/_next/static/css/styles.css"></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
}

export default MyDocument