import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Tag,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  // import { ReactNode } from "react";
  
  const Logo = (props) => {
    return (
      <img
        style={{
          maxWidth: "40%",
          height: "auto",
          "@media (min-width: 768px)": {
            maxWidth: "30%",
          },
          "@media (min-width: 1024px)": {
            maxWidth: "20%",
          },
          "@media (min-width: 1440px)": {
            maxWidth: "10%",
          },
        }}
        src="/assets/images/railwaysLogo.png" className="w-[50px]"
        alt="Logo"
        {...props}
      />
    );
  };
  
  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
        {children}
      </Text>
    );
  };
  
  export default function Footer() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
      const handleWindowResize = () => {
        setWindowSize(window.innerWidth);
      };
  
      window.addEventListener("resize", handleWindowResize);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
    return (
      <Box
        style={{ marginTop: "50px" }}
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.800", "gray.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={"flex-start"}>
              <ListHeader>Product</ListHeader>
              <Box as="a" href={"#"}>
                Overview
              </Box>
              <Stack direction={"row"} align={"center"} spacing={2}>
                <Box as="a" href={"#"}>
                  Features
                </Box>
                <Tag
                  size={"sm"}
                  bg={useColorModeValue("red.500", "red.800")}
                  ml={2}
                  color={"white"}
                >
                  What's New
                </Tag>
              </Stack>
              <Box as="a" href={"#"}>
                Tutorials
              </Box>
              <Box as="a" href={"#"}>
                Pricing
              </Box>
              <Box as="a" href={"#"}>
                Releases
              </Box>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Company</ListHeader>
              <Box as="a" href={"#"}>
                About Us
              </Box>
              <Box as="a" href={"#"}>
                Press
              </Box>
              <Box as="a" href={"#"}>
                Careers
              </Box>
              <Box as="a" href={"#"}>
                Contact Us
              </Box>
              <Box as="a" href={"#"}>
                Partners
              </Box>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Legal</ListHeader>
              <Box as="a" href={"#"}>
                Cookies Policy
              </Box>
              <Box as="a" href={"#"}>
                Privacy Policy
              </Box>
              <Box as="a" href={"#"}>
                Terms of Service
              </Box>
              <Box as="a" href={"#"}>
                Law Enforcement
              </Box>
              <Box as="a" href={"#"}>
                Status
              </Box>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Follow Us</ListHeader>
              <Box as="a" href={"#"}>
                Facebook
              </Box>
              <Box as="a" href={"#"}>
                Twitter
              </Box>
              <Box as="a" href={"#"}>
                Dribbble
              </Box>
              <Box as="a" href={"#"}>
                Instagram
              </Box>
              <Box as="a" href={"#"}>
                LinkedIn
              </Box>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box
          sx={{
            paddingTop: 10,
            paddingBottom: `${windowSize <= 600 ? "65px" : 10}`,
          }}
        >
          <Flex
            align={"center"}
            _before={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              ml: 8,
            }}
          >
            <Logo />
          </Flex>
          <Text pt={6} fontSize={"sm"} textAlign={"center"}>
            © Made with <span style={{ color: "res" }}>&#10084;</span> by "Astro
            CIPHERS"
          </Text>
        </Box>
      </Box>
    );
  }
  