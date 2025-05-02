{*
  This layout is used for all the 'public' modules
  (i.e Loris modules or pages that don't require user to be logged in)
*}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{$study_title}</title>

  <link type="image/x-icon" rel="icon" href="{$baseurl}/images/favicon.ico">
  <link rel="stylesheet" href="{$baseurl}/css/public_layout.css">
   <link type="image/x-icon" rel="icon" href="{$baseurl}/images/favicon.ico">
  {section name=jsfile loop=$jsfiles}
    <script src="{$jsfiles[jsfile]}" type="text/javascript"></script>
  {/section}

  {section name=cssfile loop=$cssfiles}
    <link rel="stylesheet" href="{$cssfiles[cssfile]}">
  {/section}
   <script src="{$baseurl}/js/components/SignInButton.js" type="text/javascript"></script>
</head>
<body>
  <header class="header">
	<div style="margin-right: 1em">
		<a href="{$baseurl}"><img src="{$baseurl}/images/LORIS_logo.svg" class="loris-logo" alt="Loris Logo"/></a>
	</div>
	<nav>
		{if $menus}
		<ol>
			{foreach from=$menus item=menu}
			<li><a href="{$menu.link}">{$menu.label}</a></li>
			{/foreach}
		</ol>
		{/if}
	</nav>
	<div id="menusignin" />
	<script>

                ReactDOM.createRoot(
                  document.getElementById("menusignin")
                ).render(
                  React.createElement(SignInButton, {
                    BaseURL: "{$baseurl}"
                  })
                );
	</script>
  </header>

  <section class="main-content">
	{$workspace}
  </section>

  <footer class="footer">
    Powered by <a href="http://www.loris.ca/" target="_blank">LORIS</a>
    | GPL-3.0 &copy; {$currentyear} <br/>
    Developed at
    <a href="http://www.mni.mcgill.ca" target="_blank">
      Montreal Neurological Institute and Hospital
    </a>
    by <a href="http://mcin-cnim.ca" target="_blank">MCIN</a>
  </footer>
</body>
</html>
