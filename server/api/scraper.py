import re, json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

def string_to_int_price(price_string):
    if price_string == None: return None
    x = re.search(r"([0-9]+)\.([0-9]+)", price_string) 
    return int(x.group(1)) * 100 + int(x.group(2))


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


class ScrapeAmazon:   
    def __init__(self, URL):
        driver = loadChromeDriver()
        driver.get(URL)
        self.url = self.get_shortened_url(URL)
        self.name = self.get_name(driver) 
        self.old_price = string_to_int_price(self.get_old_price_string(driver))  
        self.price = string_to_int_price(self.get_price_string(driver))  
        self.img_url = self.get_img_URL(driver)  
        self.availability = self.get_availability(driver)  
        driver.quit()
    
    def get_shortened_url(self, URL):
        url_match = re.search(r"amazon((?:\.[a-z]+)+)\/.*dp\/([A-Z0-9]+)", URL) 
        return 'https://www.amazon{}/dp/{}'.format(url_match.group(1), url_match.group(2))    
    def get_name(self, driver):
        try: 
            return driver.find_element_by_id('productTitle').text
        except: return None
    def get_old_price_string(self, driver):        
        # Non-books:
        try: return driver.find_element_by_class_name('priceBlockStrikePriceString').text
        except : pass
        # Books:
        try: return driver.find_element_by_css_selector('#buyBoxInner > ul > *:first-child > span > *:last-child').text
        except: return None
    def get_price_string(self, driver):
        # Non-books:
        try: return driver.find_element_by_id('priceblock_ourprice').text
        except: pass
        try: return driver.find_element_by_id('priceblock_dealprice').text
        except: pass
        try: return driver.find_element_by_id('priceblock_saleprice').text
        except: pass
        # Hardcover:
        try: return driver.find_element_by_id('price').text
        except: pass
        # Paperback
        try: return driver.find_element_by_css_selector("#buyNewSection > .a-section > .a-row > .inlineBlock-display > *:first-child").text
        except: pass
        # Ebook
        try: return driver.find_element_by_css_selector(".kindle-price > *:last-child > *:first-child").text
        except: pass
        # Audiobook
        try: return driver.find_element_by_css_selector("#accordion_row_header_cash > h5 > .a-row > .a-column.a-span4 > *:first-child").text
        except: return None
    def get_img_URL(self, driver):
        # Non-books:
        try: return driver.find_element_by_id('landingImage').get_attribute("src")
        except: pass
        # Books:
        try: return driver.find_element_by_id('imgBlkFront').get_attribute("src")
        except: pass
        # Ebooks:
        try: return driver.find_element_by_id('ebooksImgBlkFront').get_attribute("src")        
        except: pass
        # Audiobooks:
        try: return driver.find_element_by_id('main-image').get_attribute("src")        
        except: return None
    def get_availability(self, driver):
        try:
            text = driver.find_element_by_css_selector("#availability > *:first-child").text
            return (bool(re.search('in stock', text, re.IGNORECASE)))
        except: return None
