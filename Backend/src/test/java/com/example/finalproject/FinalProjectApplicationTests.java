package com.example.finalproject;

import com.example.finalproject.model.Product;
import com.example.finalproject.model.Role;
import com.example.finalproject.model.RoleType;
import com.example.finalproject.model.User;
import com.example.finalproject.repository.FavouriteListRepository;
import com.example.finalproject.repository.ProductRepository;
import com.example.finalproject.repository.RoleRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.service.FavouriteListService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;

@SpringBootTest
class FinalProjectApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FavouriteListRepository favouriteListRepository;

    @Autowired
    private FavouriteListService favouriteListService;

    @Test
    void contextLoads() {

//        final Product product = Product.builder()
//                .productName("ürün")
//                .description("açıklama")
//                .inStock(10l)
//                .price(100l)
//                .build();
//        final Product productSaved = productRepository.save(product);
//
//        final Product product2 = Product.builder()
//                .productName("ürün2")
//                .description("açıklama2")
//                .inStock(10l)
//                .price(100l)
//                .build();
//        final Product productSaved2 = productRepository.save(product2);
//
//
//        final User user = User.builder()
//                .name("ismail")
//                .username("ismail123")
//                .password("1234")
//                .email("ismail@hotmail.com")
//                .surname("coşkun")
//                .roles(Set.of(adminRole)).build();
//
//        final User user2 = User.builder()
//                .name("ismail1")
//                .username("ismail11111")
//                .password("1234")
//                .email("ismail@hotmail.com")
//                .surname("coşkun")
//                .roles(Set.of(adminRole)).build();
//
//
//        final User userSaved2 = userRepository.save(user2);
//
//        final User userSaved = userRepository.save(user);
//
//        favouriteListService.addFavouriteList(product2.getId(), 1l);

     //   List<Product> productList = productRepository.findProductByProductNameLike("pro");
       // List<Product> productList2 = productRepository.findProductByProductNameContaining("pro");



        //        final FavouriteList favouriteList = new FavouriteList(user, new ArrayList<Product>());
//        favouriteList.getProductsFavList().add(product);
//        favouriteList.getProductsFavList().add(product2);


//        final BlackList blackList = new BlackList(user,new ArrayList<User>());
//        blackList.getOwnerList().add(user2);
//
//        user.setFavouriteList(favouriteList);
//        user.setBlackList(blackList);


//        user.getFavouriteList().getId();


        //favouriteListRepository.delete(user.getFavouriteList());

//         favouriteListRepository.save(user.getFavouriteList());


        //      userRepository.findUsersByNameLike("ismail");

//        productRepository.findProductByProductName("ürün");

        //   userRepository.findUsersByRolesLike("ADMIN");

        //    favouriteListRepository.findFavouriteListById(111l);


    }

}
