import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType

class ScrapeAmazon:   
    def __init__(self, URL):
        chrome_options = Options()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--ignore-certificate-errors')
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--remote-debugging-port=9222')
        executable_path=ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install()
        
        userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'
        chrome_options.add_argument("user-agent={}".format(userAgent))   

        self.driver = webdriver.Chrome(executable_path=executable_path, options=chrome_options)    
        self.driver.get(URL)
        self.itemURL = URL
        self.title = self.getTitle() 
        self.oldPrice = self.getOldPrice()  
        self.price = self.getPrice()  
        self.imgURL = self.getImgURL()  
        self.availability = self.getAvailability()  
        self.driver.quit()
    def getTitle(self):
        try: 
            return self.driver.find_element_by_id('productTitle').text
        except: return None
    def getOldPrice(self):
        try: 
            return self.driver.find_element_by_class_name('priceBlockStrikePriceString').text
        except: return None
    def getPrice(self):
        try: 
            return self.driver.find_element_by_id('priceblock_ourprice').text
        except: return None
    def getImgURL(self):
        try: 
            return self.driver.find_element_by_id('landingImage').get_attribute("src")
        except: return None
    def getAvailability(self):
        try:
            text = self.driver.find_element_by_css_selector("#availability > *:first-child").text
            return (bool(re.search('in stock', text, re.IGNORECASE)))
        except: return None
    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)
