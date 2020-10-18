#!/bin/bash

echo 'Single item using string input:'
python3 -c "import scraper; item = scraper.scrapeAmazon('https://www.amazon.co.uk/dp/B07PJV3JPR'); print(item)"
echo -e "\n"
echo 'Multiple items using array input:'
python3 -c "import scraper; items = scraper.scrapeAmazon(['https://www.amazon.co.uk/dp/B07PJV3JPR','https://www.amazon.co.uk/dp/B07WMKZZXL','https://www.amazon.co.uk/dp/B08H95Y452']); [print(item) for item in items]"
 


