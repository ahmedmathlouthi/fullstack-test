# frozen_string_literal

class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'pgcrypto'
    create_table :users, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :firstname, null: false, limit: 64
      t.string :lastname, null: false, limit: 64
      t.string :email, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
