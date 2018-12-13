class Memcache
  class << self

    # get ttl
    #
    # * Author: Aman
    # * Date: 30/10/2017
    # * Reviewed By: Sunil
    #
    # @params [Integer] ttl
    #
    def get_ttl(ttl)
      (ttl.to_i == 0  || ttl > GlobalConstant::Cache.default_ttl) ? GlobalConstant::Cache.default_ttl : ttl.to_i
    end

    # Read
    #
    # * Author: Aman
    # * Date: 30/10/2017
    # * Reviewed By: Sunil
    #
    # @params [String] key - memcache key name.
    # @params [Boolean] marshaling (optional) - Marshal data or not?
    #
    # @return [Object/String/Integer] memcached data if present else nil
    #
    def read(key, _marshaling = true)
      Rails.cache.read(key)
    rescue => exc
      Rails.logger.error { "MEMCACHE-ERROR: read: K: #{key}. M: #{exc.message}, I: #{exc.inspect}" }
      nil
    end

    # get set memcached
    #
    # * Author: Aman
    # * Date: 11/12/2018
    # * Reviewed By:
    #
    # @params [String] key - memcache key.
    # @params [Integer] ttl (optional) - memcache key expiry time in seconds
    # @params [Boolean] marshaling (optional) - Marshal data or not?
    #
    # @return [] if memcache set data is already present, else create and return
    #
    def get_set_memcached(key, ttl = 0, marshaling = true)
      raise 'block not given to get_set_memcached' unless block_given?

      Rails.cache.fetch(key, {expires_in: get_ttl(ttl), raw: !marshaling}) do
        yield
      end

    rescue => exc
      Rails.logger.error { "MEMCACHE-ERROR: fetch: K: #{key.inspect}. M: #{exc.message}, I: #{exc.inspect}" }
      nil
    end

    # Delete
    #
    # * Author: Aman
    # * Date: 11/12/2018
    # * Reviewed By:
    #
    # @params [String] key - memcache key.
    # @params [Hash] options (optional)
    #
    # @return [Boolean] nil with current behavior, may return true and false if error handling done
    #
    def delete(key, options = nil)
      Rails.cache.delete(key, options)
    rescue => exc
      Rails.logger.error { "MEMCACHE-ERROR: delete: K: #{key.inspect}. M: #{exc.message}, I: #{exc.inspect}" }
      nil
    end

  end

end
