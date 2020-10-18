from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options

options = Options()
options.add_argument("--headless")

PATH = '/home/user/scraping/geckodriver'
browser = webdriver.Firefox(executable_path=PATH, options=options)

def getItem(URL):
    browser.get(URL)
    details = {
        "title": None,
        "oldPrice": None,
        "price": None,
        "imgURL": None,
    }
    try: details["title"] = browser.find_element_by_id('productTitle').text
    except: pass
    try: details["oldPrice"] = browser.find_element_by_class_name('priceBlockStrikePriceString').text
    except: pass
    try: details["price"] = browser.find_element_by_id('priceblock_ourprice').text
    except: pass
    try: details["imgURL"] = browser.find_element_by_id('landingImage').get_attribute("src")
    except: pass    
    print(details)

try:
    getItem('https://www.amazon.co.uk/dp/B07PJV3JPR')
    getItem('https://www.amazon.co.uk/dp/B07WMKZZXL')
finally:
    browser.quit()

