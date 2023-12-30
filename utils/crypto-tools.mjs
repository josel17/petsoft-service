//let crypto = require("crypto");
import crypto from 'crypto';


	let params = {
		alg: "aes256",
		key: "",
		iv: "",
	};
	function setParams(_alg, _key, _iv) {
		params.alg = "AES256";
		params.key = process.env.KEY;
		params.iv = process.env.IV;
	}
	function encryptText(bodyJson, encoding) {
		setParams();
		
		const cipher = crypto.createCipheriv(params.alg, params.key, params.iv);
		encoding = encoding || "base64";
		let result = cipher.update(JSON.stringify(bodyJson), "utf8", encoding);
		result += cipher.final(encoding);
		return result;
		
	
		
	}
	 function decryptText(bodyJson, encoding) {
		setParams();
		
		const decipher = crypto.createDecipheriv(params.alg, params.key, params.iv);
		encoding = encoding || "base64";
		let result = decipher.update(bodyJson.bodyData, encoding);
		result += decipher.final();
		return JSON.parse(result);
	}
	

	export {
		decryptText as decryptText,
		encryptText as encryptText,
		setParams as setParams
	}

