import * as puppeteer from 'puppeteer'
export default async (query) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
   
    
   
    await page.goto(`https://www.cimri.com/market/arama?q=${query}&page=1`)
  
    // execute standard javascript in the context of the page.
    const productPrices = await page.$$eval('.ProductCard_price__10UHp', anchors => { return anchors.map(anchor => anchor.textContent) })
    const productNames=await page.$$eval('.ProductCard_productName__35zi5', anchors => { return anchors.map(anchor => anchor.textContent) })
    const productImageLinks=await page.$$eval('.ProductCard_imageContainer__ASSCc  img[src]' ,anchors => { return anchors.map((anchor) => anchor.getAttribute('src')).
                                                                                                                              filter((link)=>link.includes('cdn.cimri.io')) })
    //ProductCard_productCard__412iI
    let productLinksUnfiltered=await page.$$eval('.ProductCard_productCard__412iI  a[href]' ,anchors => { return anchors.map(anchor => 'https://www.cimri.com/'+anchor.getAttribute('href')) })
    const productLinks=productLinksUnfiltered.filter((a,idx)=>idx%2==0)
    const product={"prices":productPrices,
                   "names":productNames,
                   "images":productImageLinks,
                    "links":productLinks}
    
    await browser.close()
    return product
  }
