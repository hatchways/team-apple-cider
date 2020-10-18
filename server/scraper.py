from selenium import webdriver
from selenium.webdriver.firefox.options import Options

options = Options()
options.add_argument("--headless")

PATH = '/home/user/scraping/geckodriver'
browser = webdriver.Firefox(executable_path=PATH, options=options)
browser.get('https://www.amazon.co.uk/dp/B07PJV3JPR/')

try:
    title = browser.find_element_by_id('productTitle').text
    oldPrice = browser.find_element_by_class_name('priceBlockStrikePriceString').text
    price = browser.find_element_by_id('priceblock_ourprice').text
    print('Product Title: ' + title)
    print('Old Price: ' + oldPrice)
    print('Price: ' + price)
finally:
    browser.quit()