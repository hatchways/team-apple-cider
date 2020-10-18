#!/bin/bash

singleURL="https://www.amazon.co.uk/dp/B07PJV3JPR"
urlArray="['https://www.amazon.co.uk/dp/B07PJV3JPR','https://www.amazon.co.uk/dp/B07WMKZZXL','https://www.amazon.co.uk/dp/B08H95Y452']"

echo -e '\nSingle item using string input:\n'
python3 -c "import scraper; item = scraper.scrapeAmazon('${singleURL}'); print(item)"
echo -e '\nMultiple items using array input:\n'
python3 -c "import scraper; items = scraper.scrapeAmazon(${urlArray}); [print(item) for item in items]"
 


