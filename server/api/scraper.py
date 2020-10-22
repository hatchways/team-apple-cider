import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

class ScrapeAmazon:   
    def __init__(self, URL):
        chrome_options = Options()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--ignore-certificate-errors')
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--remote-debugging-port=9222')
        executable_path=ChromeDriverManager().install()
        
        userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'
        chrome_options.add_argument("user-agent={}".format(userAgent))   

        driver = webdriver.Chrome(executable_path=executable_path, options=chrome_options)    
        driver.get(URL)
        self.shopURL = URL
        self.title = self.get_title(driver) 
        self.oldPrice = self.get_old_price(driver)  
        self.price = self.get_price(driver)  
        self.imgURL = self.get_img_URL(driver)  
        self.availability = self.get_availability(driver)  
        driver.quit()
    def get_title(self, driver):
        try: 
            return driver.find_element_by_id('productTitle').text
        except: return None
    def get_old_price(self, driver):
        try: 
            return driver.find_element_by_class_name('priceBlockStrikePriceString').text
        except: return None
    def get_price(self, driver):
        try: return driver.find_element_by_id('priceblock_ourprice').text
        except: pass
        try : return driver.find_element_by_id('priceblock_dealprice').text
        except: pass
        try : return driver.find_element_by_id('priceblock_saleprice').text
        except: return None
    def get_img_URL(self, driver):
        try: 
            return driver.find_element_by_id('landingImage').get_attribute("src")
        except: return None
    def get_availability(self, driver):
        try:
            text = driver.find_element_by_css_selector("#availability > *:first-child").text
            return (bool(re.search('in stock', text, re.IGNORECASE)))
        except: return None
