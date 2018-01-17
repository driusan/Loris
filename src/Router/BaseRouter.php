<?php
namespace LORIS\Router;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use LORIS\Http\StringStream;

// Handles the root of a LORIS install. It will mostly delegate to the
// module router.
// FIXME: Add other things in .htaccess here.
class BaseRouter extends Prefix implements \LORIS\Middleware\RequestHandlerInterface {
    protected $projectdir;
    protected $moduledir;
    protected $user;

    public function __construct(\User $user, string $projectdir, string $moduledir) {
        $this->user = $user;
        $this->projectdir = $projectdir;
        $this->moduledir = $moduledir;
    }

    public function handle(ServerRequestInterface $request) : ResponseInterface {
        $uri = $request->getUri();
        $path = $uri->getPath();
        $request = $request->withAttribute("user", $this->user);
        if ($path == "/" || $path == "") {
            if ($this->user instanceof \LORIS\AnonymousUser) {
                $modulename = "login";
            }  else {
                $modulename = "dashboard";
            }
            $request = $request->withURI($uri->withPath("/"));
        } else if ($path[0] === "/") {
            $path = substr($path, 1);
            $request = $request->withURI($uri->withPath($path));
        }
        if (empty($modulename)) {
            $components = explode("/", $path);
            $modulename = $components[0];
        }
        if (is_dir($this->moduledir . "/" . $modulename)) {
            $uri = $request->getURI();
            $suburi = $this->stripPrefix($modulename, $uri);
            $module = \Module::factory($modulename);

            // Calculate the base path by stripping off the module from the original.
            $path = $uri->getPath();
            $baseurl = substr($path, strrpos($path, $suburi->getPath()));
            $baseurl = $uri->withPath($baseurl)->withQuery("");
            $request= $request->withAttribute("baseurl", $baseurl->__toString());
            $mr = new ModuleRouter($module, $this->moduledir);
            return $mr->handle($request->withURI($suburi));
        }

        // FIXME: Use 404 from smarty template.
        return (new \Zend\Diactoros\Response())
            ->withStatus(404)
            ->withBody(new StringStream("Not Found"));
    }
}
