import re
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--ignore-certificate-errors')
# chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--remote-debugging-port=9222')
executable_path=ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install()
driver = webdriver.Chrome(executable_path=executable_path, options=chrome_options)


class Item:   
    def __init__(self, URL):
        driver.get(URL)
        self.title = self.getTitle() 
        self.oldPrice = self.getOldPrice()  
        self.price = self.getPrice()  
        self.imgURL = self.getImgURL()  
        self.availability = self.getAvailability()  
    @staticmethod
    def getTitle():
        try: 
            return driver.find_element_by_id('productTitle').text
        except: return None
    @staticmethod
    def getOldPrice():
        try: 
            return driver.find_element_by_class_name('priceBlockStrikePriceString').text
        except: return None
    @staticmethod
    def getPrice():
        try: 
            return driver.find_element_by_id('priceblock_ourprice').text
        except: return None
    @staticmethod
    def getImgURL():
        try: 
            return driver.find_element_by_id('landingImage').get_attribute("src")
        except: return None
    @staticmethod
    def getAvailability():
        try:
            text = driver.find_element_by_css_selector("#availability > *:first-child").text
            return (bool(re.search('in stock', text, re.IGNORECASE)))
        except: return None
    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)

def scrapeAmazon(input):
    try:
        if (isinstance(input, list)):
            items = []
            for url in input: items.append(Item(url))
            return items
        elif (isinstance(input, str)): return Item(input)
        else: return 'ERROR: INVALID INPUT'
    except:
        return 'ERROR: SCRAPE FAILED'
    finally:
        driver.quit()