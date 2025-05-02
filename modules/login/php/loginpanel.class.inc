<?php declare(strict_types=1);

namespace LORIS\login;

class LoginPanel implements \LORIS\GUI\Widget {

	public function __construct(protected \LORIS\LorisInstance $loris, protected string $title, protected string $content) {
	}

	public function __toString() {
		error_log("Rendering");
		$m = $this->loris->getModule("login");
		return $m->renderTemplate("loginpanel.tpl", ['title' => $this->title, "content" => $this->content]);
	}
}
