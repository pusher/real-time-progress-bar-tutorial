require 'sinatra'
require 'pusher'

## required keys for Pusher. you can find them in your dashboard at https://app.pusherapp.com/
Pusher.app_id = ENV['pusher_app_id']
Pusher.key = ENV['pusher_app_key']
Pusher.secret = ENV['pusher_app_secret']

get '/' do
  erb :index
end

post '/create_account_no_realtime' do
  sleep(12) # Faking a background job
  "How did it feel to wait for 12 seconds?"
end

post '/create_account_with_realtime' do
  name = params[:name]
  uid = params[:uid]
  pusher_channel = "signup_process_#{uid}"
  fake_background_job(name, pusher_channel)
end


def fake_background_job(name, pusher_channel) # Faking a background job
  Pusher.trigger(pusher_channel, 'update', {message: "Starting provisioning your account #{name}", progress: 30 })
  sleep(3)
  Pusher.trigger(pusher_channel, 'update', {message: "Sorry #{name}, It's taking a bit of time.", progress: 30 })
  sleep(2)
  Pusher.trigger(pusher_channel, 'update', {message: "Adding demo data, almost there.", progress: 60 })
  sleep(4)
  Pusher.trigger(pusher_channel, 'update', {message: "Polising your new account...", progress: 90 })
  sleep(3)
  Pusher.trigger(pusher_channel, 'update', {message: "Everything is ready for you #{name}! did it feels like 12 seconds?", progress: 100 })
end