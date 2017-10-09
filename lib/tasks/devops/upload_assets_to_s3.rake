namespace :devops do

  require 'pathname'

  task :upload_assets_to_s3 => :environment do


    # access_key = ENV['access_key'].to_s
    # secret_key = ENV['secret_key'].to_s

    if access_key.blank? || secret_key.blank?
      exit!
    end

    environment = Rails.env
    asset_bucket = "wa.simpletoken.org"

    content_types = {
      '.gz' => 'gzip',
    }

    # auth_key_str = "--access_key=#{access_key} --secret_key=#{secrete_key}"

    Dir.chdir("./public#{Rails.application.config.assets.prefix}") do
      Dir['**/*.*'].each do |file|
        file_path = Pathname(file)
        # Upload compressed JS and CSS files on S3
        if content_types.key?(file_path.extname)
          upload_file_name = file_path.to_s.split(File.extname(file)).first
          upload_file_extension = upload_file_name.split(".").last.to_s
          puts file_path
          if upload_file_extension.include?("js")
            puts "aws s3 cp #{Rails.root.to_s}/public#{Rails.application.config.assets.prefix}/#{file} s3://#{asset_bucket}#{Rails.application.config.assets.prefix}/#{upload_file_name} --acl-public --add-header 'Content-Encoding: gzip' --add-header 'Cache-Control: public, max-age=315360000' --add-header 'Expires: Thu, 25 Jun 2025 20:00:00 GMT'  --mime-type 'application/x-javascript'"
            %x{aws s3 cp #{Rails.root.to_s}/public#{Rails.application.config.assets.prefix}/#{file} s3://#{asset_bucket}#{Rails.application.config.assets.prefix}/#{upload_file_name} --acl-public --add-header 'Content-Encoding: gzip' --add-header 'Cache-Control: public, max-age=315360000' --add-header 'Expires: Thu, 25 Jun 2025 20:00:00 GMT'  --mime-type 'application/x-javascript'}
          elsif upload_file_extension.include?("css")
            puts "aws s3 cp #{Rails.root.to_s}/public#{Rails.application.config.assets.prefix}/#{file} s3://#{asset_bucket}#{Rails.application.config.assets.prefix}/#{environment}/#{upload_file_name} --acl-public --add-header 'Content-Encoding: gzip' --add-header 'Cache-Control: public, max-age=315360000' --add-header 'Expires: Thu, 25 Jun 2025 20:00:00 GMT' --mime-type 'text/css'"
            %x{aws s3 cp #{Rails.root.to_s}/public#{Rails.application.config.assets.prefix}/#{file} s3://#{asset_bucket}#{Rails.application.config.assets.prefix}/#{upload_file_name} --acl-public --add-header 'Content-Encoding: gzip' --add-header 'Cache-Control: public, max-age=315360000' --add-header 'Expires: Thu, 25 Jun 2025 20:00:00 GMT' --mime-type 'text/css'}
          else
            puts "Can't upload #{file}"
          end
        end
      end
    end

  end

end
