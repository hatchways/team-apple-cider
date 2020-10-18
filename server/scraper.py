from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options

options = Options()
options.add_argument("--headless")

PATH = '/home/user/scraping/geckodriver'
browser = webdriver.Firefox(executable_path=PATH, options=options)

def getTitle():
    try: return browser.find_element_by_id('productTitle').text
    except: return None

def getOldPrice():
    try: return browser.find_element_by_class_name('priceBlockStrikePriceString').text
    except: return None

def getPrice():
    try: return browser.find_element_by_id('priceblock_ourprice').text
    except: return None

def getImgURL():
    try: return browser.find_element_by_id('landingImage').get_attribute("src")
    except: return None

def getAvailability():
    try:
        text = browser.find_element_by_css_selector("#availability > *:first-child").text
        return (text == 'In stock.')
        # Needs to decide if "In stock on x date" counts as available
    except: return None


def getItem(URL):
    browser.get(URL)
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
    finally:
        browser.quit()