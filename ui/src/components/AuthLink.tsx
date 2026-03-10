import React, { useMemo } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import EllipseSeparator from "@/components/ui/EllipseSeparator";
import Link from "@/components/ui/Link";

interface AuthLinkElem {
  name: string;
  href: string;
}

interface AuthLinkProps {
  links: AuthLinkElem[];
}

export default function AuthLink({ links }: AuthLinkProps) {
  let children = useMemo(() => {
    let list = [];
    for (let i = 0; i < links.length; i++) {
      if (links[i] == null) {
        continue;
      }
      if (list.length !== 0) {
        list.push(<EllipseSeparator />);
      }
      list.push(
        <Link
          style={styles.serverAddrText}
          key={links[i].href}
          color="secondary"
          href={links[i].href as any}
          replace
        >
          {links[i].name}
        </Link>,
      );
    }
    return list;
  }, [links]);

  return <View style={styles.serverAddrContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  serverAddrContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  serverAddrText: {
    flex: 1,
    textAlign: "center",
  },
});
