# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::FeedbacksController, type: :request do
  describe 'GET #index' do
    it 'returns a success response' do
      get api_v1_feedbacks_path
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    let(:user_info_attributes) { FactoryBot.attributes_for(:user, :valid) }
    let(:valid_feedback) { FactoryBot.attributes_for(:feedback, :valid) }
    let(:user_info_static_email) { FactoryBot.attributes_for(:user, :valid, email: 'test@test.com') }

    context 'with valid params' do
      it 'creates a new feedback with user' do
        feedback = valid_feedback.merge(user: user_info_attributes)
        expect do
          post(create_feedback(feedback))
        end.to change(Feedback, :count).by(1)
      end

      it 'creates a new user with feedback' do
        feedback = valid_feedback.merge(user: user_info_attributes)
        expect do
          post(create_feedback(feedback))
        end.to change(User, :count).by(1)
      end

      it 'updated user if email exists' do
        feedback = valid_feedback.merge(user: user_info_static_email)
        expect do
          post(create_feedback(feedback))
        end.to change(User, :count).by(1)

        # updates user
        expect do
          post(create_feedback(feedback))
        end.to change(User, :count).by(0)
      end
    end
  end

  def create_feedback(valid_feedback)
    api_v1_feedbacks_path(
      params: valid_feedback
    )
  end
end
