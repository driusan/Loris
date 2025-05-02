<?php declare(strict_types=1);

namespace LORIS\login;

class LoginListPanel implements \LORIS\GUI\Widget {

	public function __construct(protected \LORIS\LorisInstance $loris, protected string $title, protected iterable $items) {

	}

	public function __toString() {
		$m = $this->loris->getModule("login");
		$content = $m->renderTemplate("loginlistpanel.tpl", ["items" => $this->items ]);
		return $m->renderTemplate("loginpanel.tpl", ['title' => $this->title, "content" => $content]);
	}
}
