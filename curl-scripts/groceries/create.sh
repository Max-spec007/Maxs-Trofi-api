#!/bin/bash

API="http://localhost:4741"
URL_PATH="/groceries"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "list": {
       "nameOfFood": "'"${NAMEOFFOOD}"'",
       "dateOfPurchase": "'"${DATEOFPURCHASE}"'",
       "quantity": "'"${QUANTITY}"'",
       "category": "'"${CATEGORY}"'",
       "owner": "'"${OWNERID}"'"
    }
  }'

echo
