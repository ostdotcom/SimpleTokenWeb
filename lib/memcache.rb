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

  end

end
