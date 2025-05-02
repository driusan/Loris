<?php declare(strict_types=1);

namespace LORIS\login;
/**
 * Implements the main LORIS user login page to handle authentication
 * of users.
 *
 * @category LORIS_Module
 * @package  Login
 * @author   Dave MacFarlane <david.macfarlane2@mcgill.ca>
 *           Alizée Wickenheiser <alizee.wickenheiser@mcin.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
class Login extends \NDB_Page
{
	function setup() {
		$config = $this->loris->getConfiguration();
		$this->setTemplateVar("study_title", $config->getSetting("title"));

		$links =$config->getExternalLinks('FooterLink');

		$this->tpl_data['links'] = array();
		foreach ($links as $label => $url) {
			$WindowName = md5($url);

			$this->tpl_data['links'][] = array(
                                    'url'        => $url,
                                    'label'      => $label,
                                    'windowName' => $WindowName,
                                   );
		}

		$this->tpl_data['infopanels'] = [];
		foreach($this->loris->getActiveModules() as $module) {
			// Note: A module *does not* need to be public to provide an info panel. It's up to the module to be sure it doesn't expose confidential data.
			$panels = $module->getWidgets("loginpanel", \User::singleton(), []);
			error_log("Panels" . count($panels));
				foreach($panels as $panel) {
					$this->tpl_data['infopanels'][] = $panel->__toString();
				}
		}
		/*
		$this->tpl_data['sites'] = array();
		foreach ( \Utility::getSiteList() as $val) {
			if(!empty($val)) {
				$this->tpl_data['sites'][] = $val;
			}
		}

		$this->tpl_data['cohorts'] = array();
		foreach ( \Utility::getCohortList() as $val) {
			if(!empty($val)) {
				$this->tpl_data['cohorts'][] = $val;
			}
		}
		 */
		
		$this->tpl_data["studydesc"] = $config->getSetting("StudyDescription");

	}
}
