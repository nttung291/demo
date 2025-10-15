import BottomSheetCore, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { MD2Colors as Colors } from "react-native-paper";
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { H3, H4 } from "./Typography";

type IBottomSheetProps = {
  isVisible: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  initialSnapIndex?: number;
  enablePanDownToClose?: boolean;
  enableContentPanningGesture?: boolean;
  enableHandlePanningGesture?: boolean;
  backdropOpacity?: number;
  containerStyle?: ViewStyle;
  handleComponent?: React.FC<object> | null;
  showsHandle?: boolean;
  animateOnMount?: boolean;
  detached?: boolean;
  bottomInset?: number;
  keyboardBehavior?: BottomSheetProps["keyboardBehavior"];
  keyboardBlurBehavior?: BottomSheetProps["keyboardBlurBehavior"];
};

export const BottomSheet: React.FC<IBottomSheetProps> = ({
  isVisible,
  title,
  onClose,
  children,
  snapPoints = ["50%"],
  initialSnapIndex = 0,
  enablePanDownToClose = true,
  enableContentPanningGesture = true,
  enableHandlePanningGesture = true,
  backdropOpacity = 0.3,
  containerStyle,
  animateOnMount = true,
  detached = false,
  keyboardBehavior = "interactive",
  keyboardBlurBehavior = "restore",
}) => {
  const bottomSheetRef = useRef<BottomSheetCore>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        enableTouchThrough={false}
        style={styles.backdropContainer}
      />
    ),
    []
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVisible) {
        bottomSheetRef.current?.expand();
      } else {
        bottomSheetRef.current?.close();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <BottomSheetCore
      ref={bottomSheetRef}
      index={isVisible ? initialSnapIndex : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={enablePanDownToClose}
      enableContentPanningGesture={enableContentPanningGesture}
      enableHandlePanningGesture={enableHandlePanningGesture}
      backdropComponent={renderBackdrop}
      handleComponent={null}
      animateOnMount={animateOnMount}
      detached={detached}
      bottomInset={0}
      keyboardBehavior={keyboardBehavior}
      keyboardBlurBehavior={keyboardBlurBehavior}
      backgroundStyle={styles.backgroundStyle}
      style={[styles.bottomSheet, containerStyle]}
    >
      <BottomSheetView style={styles.contentContainer}>
        {title && <H3 style={styles.title}>{title}</H3>}
        {children}
      </BottomSheetView>
    </BottomSheetCore>
  );
};
const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    color: Colors.grey800,
  },
  backdropContainer: { backgroundColor: Colors.grey800, opacity: 0.8 },
  contentContainer: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 12,
  },
  backgroundStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
