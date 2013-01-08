# -*- encoding: utf-8 -*-
require File.expand_path('../lib/scriptcam-rails/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Eduardo Maia"]
  gem.email         = ["eduvimaia@gmail.com"]
  gem.description   = %q{ScriptCam, tastefully bundled for the Rails 3.1 asset pipeline. Sweet!}
  gem.summary       = %q{ScriptCam, tastefully bundled for the Rails 3.1 asset pipeline. Sweet!}
  gem.homepage      = "https://github.com/emaiax/scriptcam-rails"

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "scriptcam-rails"
  gem.require_paths = ["lib"]
  gem.version       = Scriptcam::Rails::VERSION

  gem.add_dependency "railties", "> 3.1.0"
  gem.add_development_dependency "bundler", "~> 1.1.rc"
  gem.add_development_dependency "rake", "~> 0.9.2"
end
