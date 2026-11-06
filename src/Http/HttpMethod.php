<?php declare(strict_types=1);
namespace LORIS\Http;

enum HttpMethod : string {
	case HEAD = 'HEAD';
	case OPTIONS = 'OPTIONS';
	case GET = 'GET';
	case POST = 'POST';
	case PUT = 'PUT';
	case DELETE = 'DELETE';
}
