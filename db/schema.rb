# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_07_05_041428) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "body", null: false
    t.string "slug", null: false
    t.integer "user_id"
    t.string "state", default: "draft", null: false
    t.integer "category_id"
    t.integer "visits", default: 0
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "position", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
  end

  create_table "future_article_updates", force: :cascade do |t|
    t.bigint "article_id"
    t.string "state", null: false
    t.datetime "scheduled_at", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["article_id"], name: "index_future_article_updates_on_article_id"
  end

  create_table "late_article_updates", force: :cascade do |t|
    t.string "state", null: false
    t.string "update_time", null: false
    t.bigint "article_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["article_id"], name: "index_late_article_updates_on_article_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "auth_token"
    t.boolean "is_password_protected", default: false
  end

  create_table "redirections", force: :cascade do |t|
    t.string "from", null: false
    t.string "to", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "organization_id"
  end

  create_table "versions", force: :cascade do |t|
    t.string "title", null: false
    t.string "body", null: false
    t.string "state", null: false
    t.integer "category_id", null: false
    t.string "tag", default: "drafted", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "article_id", null: false
  end

  add_foreign_key "articles", "categories"
  add_foreign_key "articles", "users"
  add_foreign_key "future_article_updates", "articles"
  add_foreign_key "late_article_updates", "articles"
  add_foreign_key "users", "organizations"
  add_foreign_key "versions", "articles"
  add_foreign_key "versions", "categories"
end
