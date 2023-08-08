import 'dart:convert';

import 'package:amazon_clone_front/constants/utils.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;

void httpErrorHandle({
  required http.Response response,
  required BuildContext context,
  required VoidCallback onSuccess,
}) {
  switch (response.statusCode) {
    case 200:
      onSuccess();
      break;
    case 400:
      final responseBody = jsonDecode(response.body);
      showSnackBar(context, responseBody['msg']);
      break;
    case 500:
      final responseBody = jsonDecode(response.body);
      showSnackBar(context, responseBody['error']);
      break;
    default:
      showSnackBar(context, response.body);
      break;
  }
}
