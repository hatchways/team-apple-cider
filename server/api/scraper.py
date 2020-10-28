import re, json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

def loadChromeDriver():
    chrome_options = Options()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--remote-debugging-port=9222')
    executable_path=ChromeDriverManager().install()
    userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'
    chrome_options.add_argument("user-agent={}".format(userAgent))   
    return webdriver.Chrome(executable_path=executable_path, options=chrome_options)    


def string_to_int_price(price_string):
    if price_string == None: return None
    x = re.search(r"([0-9]+)\.([0-9]+)", price_string) 
    return int(x.group(1)) * 100 + int(x.group(2))

def string_availability_to_boolean(string_availability):
    return (bool(re.search('in stock', string_availability, re.IGNORECASE)))


selectors = {
    "amazon": {
        "name": {"attribute": "innerText", "css": ['#productTitle']},
        "old_price": {"attribute": "innerText", "function": string_to_int_price, "css": ['.priceBlockStrikePriceString', '#buyBoxInner > ul > *:first-child > span > *:last-child']},
        "price": {"attribute": "innerText", "function": string_to_int_price, "css": ['#priceblock_ourprice', '#priceblock_dealprice', '#priceblock_saleprice', '#price', '#buyNewSection > .a-section > .a-row > .inlineBlock-display > *:first-child', '.kindle-price > *:last-child > *:first-child', '#accordion_row_header_cash > h5 > .a-row > .a-column.a-span4 > *:first-child']},
        "img_url": {"attribute": "src", "css": ['#landingImage', '#imgBlkFront', '#ebooksImgBlkFront', '#main-image']},
        "availability": {"attribute": "innerText", "function": string_availability_to_boolean, "css": ["#availability > *:first-child"]}
    }
}


class ScrapeAmazon:   
    def __init__(self, URL):
        
        driver = loadChromeDriver()
        self.website = "amazon"
        driver.get(URL)
        self.url = self.get_shortened_url(URL)
        
        self.old_price = self.get_parameter(driver, "old_price") 
        self.price = self.get_parameter(driver, "price") 
        self.name = self.get_parameter(driver, "name") 
        self.img_url = self.get_parameter(driver, "img_url") 
        self.availability = self.get_parameter(driver, "availability") 
        
        driver.quit()
    
    def get_shortened_url(self, URL):
        url_match = re.search(r"amazon((?:\.[a-z]+)+)\/.*dp\/([A-Z0-9]+)", URL) 
        return 'https://www.amazon{}/dp/{}'.format(url_match.group(1), url_match.group(2))

    def scrape_parameter(self, driver, parameter):
        attribute = selectors[self.website][parameter]['attribute']
        for selector in selectors[self.website][parameter]['css']:
            try: return driver.find_element_by_css_selector(selector).get_attribute(attribute)
            except: pass
        return None

    def get_parameter(self, driver, parameter):
        raw_param = self.scrape_parameter(driver, parameter)
        usingFunc = "function" in selectors[self.website][parameter]
        return (selectors[self.website][parameter]['function'](raw_param) if usingFunc else raw_param)


