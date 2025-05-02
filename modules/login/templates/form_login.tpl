	<div style="width: 100%; height: 60vh; background: url(/faerun.webp);">
		<h1>{$study_title}</h1>
	</div>
	<div style="display: flex; width: 100%; justify-content: space-evenly;">
		<div class="login-panel">
			<h2>Project Statistics</h2>
			<div>??</div>
		</div>
		{foreach from=$infopanels item=p}
		{$p}
		{/foreach}
	</div>
	<div style="width: 100%; padding: 1em;">
		{$studydesc}
	</div>
	<div style="display: flex;" class="bottomlogin">
		<div style="flex: 1; display: inline-block; margin: 1em; padding: 1em">
			<img src="/images/LORIS_logo.svg" />
		</div>
		<div style="flex: 1; margin: 1em;padding: 1em">
		<h2>Useful links</h2>
			<ul>
			{section name=link loop=$links}
			    <li><a href="">{$links[link].label}</a></li>
			{/section}
			</ul>
		</div>
	</div>
