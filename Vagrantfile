# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/xenial64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.49.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder ".", "/var/www/loris"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    PASSWORD=`date | md5sum | cut -c1-12`
    sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $PASSWORD"
    sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $PASSWORD"

    sudo add-apt-repository ppa:ondrej/php
    sudo apt-get -q update

    apt-get install -yq libapache2-mod-php libmysqlclient-dev mysql-client mysql-server php5.6 php5.6-mysql php5.6-gd php5.6-json php5.6-xml

    # LORIS needs PHP 5.6 until QuickForm is completely replaced :(
    a2dismod php7.0 && a2enmod php5.6 && service apache2 restart
    ln -sfn /usr/bin/php5.6 /etc/alternatives/php
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('SHA384', 'composer-setup.php') === 'e115a8dc7871f15d853148a7fbac7da27d6c0030b848d9b3dc09e2a0388afed865e6a3d6b3c0fad45c48e2b5fc1196ae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"

    echo "Moving composer.phar to /usr/local/bin/composer such that composer can now be used globally."

    mv composer.phar /usr/local/bin/composer

    git clone -b VagrantUp https://github.com/driusan/Loris /var/www/loris
    cd /var/www/loris
    /usr/local/bin/composer install --no-dev

    mkdir -p project smarty/templates_c
    chmod 777 smarty/templates_c
    chmod 777 project

    sed -e "s#%LORISROOT%#/var/www/loris#g" -e "s#%LOGDIRECTORY%#/var/log/apache2/#g" < docs/config/apache2-site | sudo tee /etc/apache2/sites-available/loris.conf
    sudo a2dissite 000-default
    sudo a2ensite loris.conf    
    sudo a2enmod rewrite
    sudo a2enmod headers

    sudo service apache2 restart

    echo "MySQL was installed with root password '$PASSWORD'"

    echo "Even though the password was randomly generated, it was not generated in a cryptographically secure way and you should"

    echo "change it soon. For now, it can be used to complete the installation of LORIS on this VM."

    echo "Please follow the README on GitHub to complete your installation."

    echo "Please visit http://192.168.49.10/installdb.php to complete the LORIS install."

    echo "When prompted for the MySQL host use \"127.0.0.1\" with admin username \"root\" and the password above."
  SHELL
end

