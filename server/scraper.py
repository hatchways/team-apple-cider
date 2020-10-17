import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
PATH = '/home/user/scraping/geckodriver'
browser = webdriver.Firefox(executable_path=PATH)
browser.get('http://www.amazon.com')
time.sleep(5) 
browser.quit()