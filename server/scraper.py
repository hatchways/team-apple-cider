import re
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--remote-debugging-port=9222')
executable_path=ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install()
driver = webdriver.Chrome(executable_path=executable_path, options=chrome_options)

def getTitle():
    try: return driver.find_element_by_id('productTitle').text
    except: return None

def getOldPrice():
    try: return driver.find_element_by_class_name('priceBlockStrikePriceString').text
    except: return None

def getPrice():
    try: return driver.find_element_by_id('priceblock_ourprice').text
    except: return None

def getImgURL():
    try: return driver.find_element_by_id('landingImage').get_attribute("src")
    except: return None

def getAvailability():
    try:
        text = driver.find_element_by_css_selector("#availability > *:first-child").text
        return (bool(re.search('in stock', text, re.IGNORECASE)))
    except: return None


def getItem(URL):
    driver.get(URL)
    details = {
        "title": getTitle(),
        "oldPrice": getOldPrice(),
        "price": getPrice(),
        "imgURL": getImgURL(),
        "available": getAvailability(),
    }    
    return details

def scrapeAmazon(input):
    try:
        if (isinstance(input, list)):
            items = []
            for url in input: items.append(getItem(url))
            return items
        elif (isinstance(input, str)): return getItem(input)
        else: return 'ERROR: INVALID INPUT'
    except:
        return 'ERROR: SCRAPE FAILED'
    finally:
        driver.quit()