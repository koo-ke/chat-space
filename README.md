## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|name|integer|null: false, unique: true, foreign_key: true|
|mail|string|null: false, unique: true, foreign_key: true|

### Association
- has_many :groups, through: :messages
- has_many :members
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :members
- has_many :messages
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|null: false, foreign_key: true|
|image|string|null: true, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user