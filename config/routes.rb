Brandoarts::Application.routes.draw do
  namespace :admins do
    resources :brandings
    resources :websites
  end

  devise_for :admins
  resources :admins

  resources :brandings
  resources :websites

  root :to => "home#index"
end