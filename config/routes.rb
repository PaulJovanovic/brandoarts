Brandoarts::Application.routes.draw do

  match "/branding/:id" => "brandings#show"

  namespace :admins do
    resources :brandings
    resources :webs
    resources :photographies
    resources :portfolios
    resources :modelings
    resource :attachments
  end

  devise_for :admins
  resources :admins

  resources :portfolios, :path => "portfolio"
  resources :clients
  resources :photographies, :path => "photo"
  resources :brandings, :path => "branding"
  resources :webs, :path => "web"
  resources :modelings, :path => "modeling"

  root :to => "home#index"
end