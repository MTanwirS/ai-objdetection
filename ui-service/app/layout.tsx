import { ReactNode } from 'react';
import './globals.css' 
type LayoutProps = {
  children: ReactNode;
};

//const dtype = "<!DOCTYPE html>" ;
const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang='en'>
    <head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>HTML 5 Boilerplate</title>
    <link rel="stylesheet" href="./globals.css"/>
  </head>
      <body>
        <header style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', textAlign: 'center' }}>
          <h1>Object Detection using YOLO (v11)</h1>
        </header>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;