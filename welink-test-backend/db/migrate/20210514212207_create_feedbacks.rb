# frozen_string_literal

class CreateFeedbacks < ActiveRecord::Migration[6.0]
  def change
    create_table :feedbacks, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :body, null: false

      t.timestamps
    end
  end
end
