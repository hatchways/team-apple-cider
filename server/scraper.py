from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options

options = Options()
options.add_argument("--headless")

PATH = '/home/user/scraping/geckodriver'
browser = webdriver.Firefox(executable_path=PATH, options=options)
print('\n')

def getItem(URL):
    browser.get(URL)
    title = browser.find_element_by_id('productTitle').text
    try: oldPrice = browser.find_element_by_class_name('priceBlockStrikePriceString').text
    except: oldPrice = None
    price = browser.find_element_by_id('priceblock_ourprice').text
    print('Product Title: ' + title)
    if (oldPrice): print('Old Price: ' + oldPrice)
    print('Price: ' + price + '\n')

try:
    getItem('https://www.amazon.co.uk/dp/B07PJV3JPR')
    getItem('https://www.amazon.co.uk/dp/B07WMKZZXL')
finally:
    browser.quit()

