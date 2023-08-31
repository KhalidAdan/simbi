# Symby Entities

User
Account
Payments
List
Product
Session
Messages

## User

id
name
email
last_login
created_at
updated_at

## Account

id
user_id
name
created_at
updated_at

## Payments

id
account_id
to_account_id
amount
created_at
success

## List

id
account_id
name
description
type (one_time, recurring) 

## Product

id
list_id
name
description
price
url
quantity
created_at
updated_at

## Messages

id
account_id
product_id
message
created_at
updated_at

