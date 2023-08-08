import 'package:amazon_clone_front/common/widgets/botton_bar.dart';
import 'package:amazon_clone_front/constants/global_variables.dart';
import 'package:amazon_clone_front/features/auth/screens/auth_screen.dart';
import 'package:amazon_clone_front/features/auth/services/auth_service.dart';
import 'package:amazon_clone_front/features/home/screens/home_screen.dart';
import 'package:amazon_clone_front/providers/user_provider.dart';
import 'package:amazon_clone_front/route.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(create: (context) => UserProvider()),
  ], child: const MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final AuthService authService = AuthService();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    authService.getUserData(context: context);
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: GlobalVariables.greyBackgroundColor,
        // Set status bar color
        statusBarIconBrightness: Brightness.dark, // Set status bar icon color
      ),
    );
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Amazon Clone',
      theme: ThemeData(
        scaffoldBackgroundColor: GlobalVariables.backgroundColor,
        colorScheme: const ColorScheme.light(
          primary: GlobalVariables.secondaryColor,
        ),
        appBarTheme: const AppBarTheme(
          elevation: 0,
          iconTheme: IconThemeData(
            color: Colors.black,
          ),
        ),
      ),
      onGenerateRoute: (settings) => generateRoute(settings),
      home: Provider.of<UserProvider>(context).user.token.isNotEmpty
          ? const BottomBar()
          : const AuthScreen(),
    );
  }
}
